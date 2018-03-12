import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x354c992dd55ac88f5Ad0F0e3A568335852111e36'
);

export default instance;
