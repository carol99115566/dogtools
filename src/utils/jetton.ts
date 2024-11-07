import { getEHTJettonDetail } from "./eht";


export const getJettonDetail = async (address: string, platform: string)=> {
   console.log('getJettonDetail', address, platform);
   switch (platform) {
    case 'ETH': return await getEHTJettonDetail(address); break;
   //  case 'SOL': return await getSOLJettonDetail(address);  break;
   //  case 'TON': return await geTONJettonDetail(address); break;
   //  case 'BASE': return await getEHTJettonDetail(address); break;
    default:
      break;
   }
}


