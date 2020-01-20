import Vue from 'vue';
// 验证手机号码
export function regPhone(phone) {
  return (/^1[3456789]\d{9}$/.test(phone))
}
// 验证邮箱
export function regEmail(email) {
  return (/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email))
}
// 验证身份证
export function regCard(ID) {
  return (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(ID))
}
// 验证数字
export function regNum(num) {
  return (/^[\d]{15,20}$/.test(num))
}
// 验证数字
export function uploadUserInfo(num) {
  this.$http.post("userInfo/userInfo", {token:this.$store.state.token}).then(res => {
    if (res.retCode == 0) {
      this.$store.commit("setUserInfo", res.data);
    }
  });
}