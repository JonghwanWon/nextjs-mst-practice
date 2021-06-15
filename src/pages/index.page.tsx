import { GetServerSideProps } from 'next';
import styled from 'styled-components';

import { getGlobalLayout } from '~/components/Layouts/GlobalLayout';
import TodoContainer from '~/containers/TodoContainer';
// import { TODO_FILTER } from '~/stores/TodoStore';

const Container = styled.main`
  padding: 40px 0;
`;

const Content = styled.div`
  max-width: 480px;
  padding: 0 15px;
  margin: 0 auto;
`;

const Headline = styled.h2`
  margin-bottom: 24px;
  text-align: center;
`;

type PageProps = {};

const Page: PersistentLayoutNextPage<PageProps> = ({}) => {
  return (
    <Container>
      <Content>
        <Headline>TodoList with MST(Mobx-State-Tree)</Headline>
        <TodoContainer />
      </Content>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      initialData: {
        todoStore: {
          // filter: TODO_FILTER.SHOW_ACTIVE,
        },
      },
    },
  };
};

Page.layout = (page) =>
  getGlobalLayout(page, {
    helmet: {
      title: 'Home',
    },
    noGnb: true,
  });

export default Page;
