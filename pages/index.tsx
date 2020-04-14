const Index = () => <h1>Hello world!</h1>;

Index.getInitialProps = (props): void => {
  console.log(props);
};

export default Index;
