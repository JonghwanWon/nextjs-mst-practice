import { getGlobalLayout } from '~/components/Layouts/GlobalLayout';
import TodoContainer from '~/containers/TodoContainer';
import { useStore } from '~/stores/init';

type PageProps = {};

const Page: PersistentLayoutNextPage<PageProps> = ({}) => {
  const { sample } = useStore();

  return (
    <div>
      <h1>MST(Mobx-State-Tree) Practice</h1>
      <TodoContainer store={sample} />
    </div>
  );
};

Page.layout = (page) =>
  getGlobalLayout(page, {
    helmet: {
      title: 'Home',
    },
  });

export default Page;
