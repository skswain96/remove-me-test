import { useSDK } from "@bridgesplit/sdk";
import { useConnectedWallet, useSolana } from "@saberhq/use-solana";
import TokenWrapper from "./TokenWrapper";

export default function StakeWrapper() {
  const wallet = useConnectedWallet();
  const { connection } = useSolana();
  useSDK(connection, wallet);

  return <TokenWrapper />;
}
