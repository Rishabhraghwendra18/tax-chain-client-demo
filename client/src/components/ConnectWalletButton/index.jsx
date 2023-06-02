import { ConnectWallet } from "@thirdweb-dev/react";

function ConnectWalletButton() {
  return (
    <ConnectWallet
      dropdownPosition={{
        align: "center",
        side: "bottom",
      }}
    />
  );
}
