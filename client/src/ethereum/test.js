//0x8F8cD998e70DBF0Ab478074904314C259D0B3B16;

import factory from "./factory";

// async componentDidMount()

const getdeployedCatalyst = async () => {
  const cata = await factory.methods.getDeployedCatalyst().call();
  console.log(cata);
};
getdeployedCatalyst();
