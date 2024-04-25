import { getClient } from "@reservoir0x/reservoir-sdk";
getClient()?.addEventListener((event, chainId) => {
  switch (event.name) {
    case 'purchase_error': {
      //Handle the error
      console.log(event.data);
      break;
    }
    case 'purchase_complete': {
      //Handle the success
      console.log(event.data);
      break;
    }
})