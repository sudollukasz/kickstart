import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x562b75e2463Fdf78e18847F0C6fc95e7A9b2fDD5'
);

export default instance;
