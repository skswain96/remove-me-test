import { AnchorState } from "@bridgesplit/sdk";
import {
  claimRewards,
  initializeStake,
  restake,
  StakeAccountInterface,
  StakeManagerInterface,
  unstake,
} from "@bridgesplit/staking-sdk";
import { PublicKey } from "@solana/web3.js";

interface StakingResponse {
  success: boolean;
  message: string;
  reloadNeeded: boolean;
  error?: any;
}

export const restakeParticle = async ({
  anchorState,
  stakeAccount,
  stakeManager,
  hash,
  account,
}: {
  anchorState: AnchorState;
  stakeAccount: StakeAccountInterface;
  stakeManager: StakeManagerInterface;
  hash: string;
  account: PublicKey;
}): Promise<StakingResponse> => {
  try {
    const response = await restake(
      anchorState,
      new PublicKey(stakeAccount.nftMint),
      new PublicKey(stakeManager.rewardsMint),
      account,
      new PublicKey(stakeManager.nonce),
      new PublicKey(stakeManager.initializerAccount),
      hash
    );
    if (response.status) {
      return {
        success: true,
        message: "Successfully restaked your Particle!",
        reloadNeeded: true,
      };
    } else {
      return {
        success: false,
        message: "There was an error confirming your transaction with Solana.",
        reloadNeeded: true,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: "There was an error restaking your Particle, please try again",
      reloadNeeded: false,
      error: err,
    };
  }
};

export const claimOOO = async ({
  anchorState,
  stakeAccount,
  stakeManager,
}: {
  anchorState: AnchorState;
  stakeAccount: StakeAccountInterface;
  stakeManager: StakeManagerInterface;
}): Promise<StakingResponse> => {
  try {
    const response = await claimRewards(
      anchorState,
      new PublicKey(stakeAccount.nftMint),
      new PublicKey(stakeManager.rewardsMint),
      new PublicKey(stakeManager.initializerAccount),
      PublicKey.default,
      new PublicKey(stakeManager.nonce)
    );
    if (response.status) {
      return {
        success: true,
        message: "Successfully Claimed $OOO",
        reloadNeeded: true,
      };
    } else {
      return {
        success: false,
        message: "There was an error confirming your transaction with Solana.",
        reloadNeeded: true,
      };
    }
  } catch (err) {
    return {
      success: false,
      message:
        "There was an error claiming your rewards, please try again later",
      reloadNeeded: false,
      error: err,
    };
  }
};

export const unstakeParticle = async ({
  anchorState,
  stakeAccount,
  stakeManager,
  hash,
}: {
  anchorState: AnchorState;
  stakeAccount: StakeAccountInterface;
  stakeManager: StakeManagerInterface;
  hash: string;
}): Promise<StakingResponse> => {
  try {
    const response = await unstake(
      anchorState,
      new PublicKey(stakeAccount.nftMint),
      new PublicKey(stakeManager.rewardsMint),
      new PublicKey(stakeAccount.programTokenAccount),
      new PublicKey(stakeManager.initializerAccount),
      new PublicKey(stakeManager.nonce),
      new PublicKey(stakeManager.rewardsTokenAccount),
      stakeManager.treasury_token_account
        ? new PublicKey(stakeManager.treasury_token_account)
        : PublicKey.default,
      hash
    );
    if (response.status) {
      return {
        success: true,
        message: "Successfully unstaked your Particle!",
        reloadNeeded: true,
      };
    } else {
      return {
        success: false,
        message: "There was an error confirming your transaction with Solana.",
        reloadNeeded: true,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "There was an error unstaking your Particle, please try again",
      reloadNeeded: false,
      error: err,
    };
  }
};

export const stakeParticle = async ({
  anchorState,
  mint,
  stakeManager,
  address,
  hash,
}: {
  anchorState: AnchorState;
  stakeManager: StakeManagerInterface;
  hash: string;
  mint: string;
  address: string;
}): Promise<StakingResponse> => {
  try {
    const response = await initializeStake(
      anchorState,
      new PublicKey(mint),
      new PublicKey(stakeManager.rewardsMint),
      new PublicKey(address),
      new PublicKey(stakeManager.nonce),
      new PublicKey(stakeManager.initializerAccount),
      hash
    );
    if (response.status) {
      return {
        success: true,
        message: "Successfully staked your Particle!",
        reloadNeeded: true,
      };
    } else {
      return {
        success: false,
        message: "There was an error confirming your transaction with Solana.",
        reloadNeeded: true,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "There was an error staking your Particle, please try again",
      reloadNeeded: false,
      error: err,
    };
  }
};
