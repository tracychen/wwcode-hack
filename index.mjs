import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);
const account = await stdlib.newTestAccount(startingBalance);
console.log(`Creating test account for blogger with address ${stdlib.formatAddress(account)}`);


console.log(`Having account create blog`);
const contract = account.contract(backend);

contract.participants.Blogger({
  createPost: () =>  {
    return "This is a new post";
  },
  createStream: () => {
    return "New Stream Name";
  }
});

const users = await stdlib.newTestAccounts(5, startingBalance);

const subscribe = async (userIndex) => {
  const subscriber = users[userIndex];
  const subscriberContract = subscriber.contract(backend, contract.getInfo());
  console.log(`Subscriber address: ${stdlib.formatAddress(subscriber)}`);

  subscriberContract.participants.Subscriber({
    subscribe: (streamName) => {
      console.log(`Subscriber ${stdlib.formatAddress(subscriber)} subscribed to stream "${streamName}".`);
    },
    readPost: (addr, post) => {
      console.log(`Subsciber ${stdlib.formatAddress(subscriber)} reading post from ${stdlib.formatAddress(addr)}: "${post}".`);
    }
  });
}

await (subscribe(1));
await (subscribe(2));


