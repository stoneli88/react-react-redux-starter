import React from 'react';
import {
  Container,
  Group,
} from 'amazeui-touch';

export default function NotFound() {
  return (
    <Container {...this.props}>
      <Group>
        <h2>Oops, Not Found.</h2>
      </Group>
    </Container>
  );
}
