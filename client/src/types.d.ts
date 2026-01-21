interface User {
  contact: string;
  // userid: string;
  // userinfo: {
  //   createdat: string;
  //   createdby: string;
  //   displayname: string;
  //   email: string;
  //   mobile: string;
  //   isdeleted: boolean;
  //   updatedat: string;
  //   updatedby: string;
  //   userid: string;
  // };
}
interface ValidateContactResponse {
  isActive: boolean;
  type: string;
}
