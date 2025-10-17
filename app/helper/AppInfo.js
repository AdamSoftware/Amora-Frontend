import DataInfo from './DataInfo.json';


// Going to just pull the data in from a json file 
// and then going to export them here so then I can read it later

const AppInfo = DataInfo.AppInfo;
const PrivacyPolicy = DataInfo.PrivacyPolicy;

console.log("AppInfo:", AppInfo);
console.log("PrivacyPolicy:", PrivacyPolicy);

export default { AppInfo, PrivacyPolicy };


