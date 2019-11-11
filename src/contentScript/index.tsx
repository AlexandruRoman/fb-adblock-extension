// import {Store} from 'webext-redux';
import { startRemoving } from "./remove-ads";

// const store = new Store();

// store.ready().then(() => {
//     store.dispatch({type: 'user-clicked-alias'})
//   });
setTimeout(startRemoving, 2000);
