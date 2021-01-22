import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  Page,
  Row,
  Snippet,
  Spacer,
  Textarea,
  Text,
  Select,
} from '@geist-ui/react';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/esm/parser-babel.mjs';

const languages = [
  ['js', 'Javascript'],
  ['json', 'JSON'],
];

export default function Home() {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('js');

  useEffect(() => {
    if (!value || value == '{}') {
      if (language == 'js') {
        setValue('');
      }
      if (language == 'json') {
        setValue('{}');
      }
    }
  }, [language]);

  const normalize = (stringToConv) => {
    return stringToConv
      .replace(/Object/g, '{}')
      .replace(/undefined/g, null)
      .replace(/\'/g, '"');
  };

  const getFormatted = () => {
    try {
      switch (language) {
        case 'js': {
          if (!value) {
            return '';
          }
          const formatted = prettier.format(value, {
            parser: 'babel',
            plugins: [parserBabel],
          });
          return formatted;
        }
        case 'json': {
          if (!value) {
            return '{}';
          }
          const normalizedString = normalize(value);
          const json = JSON.parse(`${normalizedString}`);
          return JSON.stringify(json, null, 2);
        }
      }
    } catch (err) {
      return `${err}`;
    }
  };

  const onLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <Page>
      <Spacer y={1} />
      <Page.Header>
        <Text h2>Web Formatter</Text>
        <Text p>Simple Code and JSON Formatter</Text>
      </Page.Header>
      <Page.Content>
        <Select
          placeholder="Choose one"
          value={language}
          onChange={onLanguageChange}
        >
          {languages.map((item) => (
            <Select.Option key={`language-key-${item[0]}`} value={item[0]}>
              {item[1]}
            </Select.Option>
          ))}
        </Select>
        <Spacer y={1} />
        <Row>
          <Textarea
            width="50%"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></Textarea>
          <Spacer x={1} />
          <Snippet type="warning" symbol="" text={getFormatted()} width="50%" />
        </Row>
      </Page.Content>
    </Page>
  );
}
