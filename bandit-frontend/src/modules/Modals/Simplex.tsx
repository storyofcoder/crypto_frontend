import React from "react";
import { Text } from "../../components/atoms/StyledSystem";

const SimplexModal = (props) => {
  return (
    <div>
      <Text fontSize="large" fontWeight="medium" textAlign="center">
        Add Money to your wallet
      </Text>
      {React.createElement('iframe', {
        title: 'Simplex Flow',
        // ref: this.setRef,
        id: 'mainframe',
        // src: openUrlDemo,//!source.method ? source.uri : undefined,
        srcDoc: `<head>
        <script>
            window.simplexAsyncFunction = function () {
                Simplex.init({public_key: ${process.env.NEXT_PUBLIC_SIMPLEX_KEY}})
            };
        </script>
        <script src="https://cdn.test-simplexcc.com/sdk/v1/js/sdk.js" async></script>
    </head>
    
    <body>
        <form id="simplex-form">
            <div id="checkout-element">
            </div>
        </form>
        <script src='https://iframe.sandbox.test-simplexcc.com/form-sdk.js' type="text/javascript"></script>
        <script>
            window.simplex.createForm();
        </script>
    </body>
    `,
        width: 480,
        height: 360,
        style: {},
        allowFullScreen: true,
        allowpaymentrequest: 'true',
        frameBorder: '0',
        seamless: true,
        // onLoad,
      })}
    </div>
  )
}

export default SimplexModal
