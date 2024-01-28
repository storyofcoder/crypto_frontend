/* eslint-disable import/no-anonymous-default-export */

export default {
  API_END_POINT: process.env.NEXT_PUBLIC_API,
  ADMIN_API_END_POINT: process.env.NEXT_PUBLIC_ADMIN_API,
  WS_END_POINT:
    process.env.NEXT_PUBLIC_WS ||
    'ws://awseb-e-j-awsebloa-1u8oxy9olzaps-1771517712.ap-southeast-1.elb.amazonaws.com/ws',
  SUPPORT: '',
  REPORT_CONTENT:
    '',
}
