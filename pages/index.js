import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Page, Row, Snippet, Spacer, Textarea,Text } from '@geist-ui/react';

export default function Home() {
  const [value, setValue] = useState('{}');


  const normalize = (stringToConv)=>{
    return stringToConv.replace(/Object/g,"{}").replace(/undefined/g,null).replace(/\'/g,"\"");
  }

  const getFormatted = () => {
    try {
      if(!value){
        return "{}"
      }
      const normalizedString = normalize(value);
      const json = JSON.parse(`${normalizedString}`);
      return JSON.stringify(json, null, 2);
    } catch (err) {
      return `${err}`;
    }
  };

  return (
    <Page>
      <Spacer y={1} />
      <Page.Header>
        <Text h2>Web Formatter</Text>
        <Text p>Simple Code and JSON Formatter</Text>
        <Text small>Only Supports JSON right now</Text>
      </Page.Header>
      <Page.Content>
          <Row>
          <Textarea
            width="50%"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></Textarea>
          <Spacer x={1}></Spacer>
          <Snippet symbol="" text={getFormatted()} width="50%" />
        </Row>
      </Page.Content>
    </Page>
  );
}
