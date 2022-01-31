import { document } from '../utils/dynamodbClient';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import dayjs from 'dayjs';
import chromium from 'chrome-aws-lambda';

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

interface ITemplate {
  id: string;
  name: string;
  grade: string;
  date: string;
  medal: string;
}

const compileTemplate = async function (data: ITemplate) {
  const filePath = path.join(
    process.cwd(),
    'src',
    'templates',
    'certificate.hbs'
  );

  const html = fs.readFileSync(filePath, 'utf-8');

  return handlebars.compile(html)(data);
}

export const handle = async (event) => {
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate;

  const response = await document
    .query({
      TableName: 'users_certificates',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id,
      },
    })
    .promise();

  const userAlreadyExists = response.Items[0];

  if (!userAlreadyExists) {
    await createUser({ id, name, grade });
  }

  const medalPath = path.join(process.cwd(), 'src', 'templates', 'selo.png');
  const medal = fs.readFileSync(medalPath, 'base64');

  const data: ITemplate = {
    date: dayjs().format('DD/MM/YYYY'),
    grade,
    name,
    id,
    medal,
  }

  const content = await compileTemplate(data);

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
  });

  const page = await browser.newPage()

  await page.setContent(content);

  await page.pdf({
    format: 'a4',
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
    path: process.env.IS_OFFLINE ? `./tmp/certificates/${id}.pdf` : null
  });

  await browser.close();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Certificate created!',
    }),
    headers: {
      "Content-type": "application/json"
    }
  }
}


async function createUser({ grade, id, name }: ICreateCertificate) {
  await document.put({
    TableName: 'users_certificates',
    Item: {
      id,
      name,
      grade
    }
  }).promise();
}