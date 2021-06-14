import { GetServerSideProps } from 'next';

import { getGlobalLayout } from '~/components/Layouts/GlobalLayout';
import TodoContainer from '~/containers/TodoContainer';
import { TODO_FILTER } from '~/stores/TodoStore';

type PageProps = {};

const Page: PersistentLayoutNextPage<PageProps> = ({}) => {
  return (
    <div>
      <h1>MST(Mobx-State-Tree) Practice</h1>
      <TodoContainer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      initialData: {
        todoStore: {
          filter: TODO_FILTER.SHOW_ACTIVE,
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
  });

export default Page;
