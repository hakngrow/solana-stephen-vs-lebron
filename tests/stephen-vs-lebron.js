const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("stephen-vs-lebron", () => {
  /* Configure the client */
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.StephenVsLebron;

  const voteAccount = anchor.web3.Keypair.generate();

  it("Initializes with 0 votes for Stephen and Lebron", async () => {
    console.log("Testing Initialize...");
    /* The last element passed to RPC methods is always the transaction options. Because voteAccount is being created here, we are required to pass it as a signers array */
    await program.rpc.initialize({
      accounts: {
        voteAccount: voteAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [voteAccount],
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );
    console.log("Stephen: ", account.stephen.toString());
    console.log("Lebron: ", account.lebron.toString());
    assert.ok(
      account.stephen.toString() == 0 && account.lebron.toString() == 0
    );
  });
});
