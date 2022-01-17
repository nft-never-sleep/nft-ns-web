var myMixin = {
  data(){
    return{
      api: null,
    }
  },
  methods: {
    async getAPI(ws) {
      try {
        let api = await ApiPromise.create({
          provider: ws,
          types: vppType,
        })
        return api
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted(){
    setTimeout(async () => {
      this.api = await this.$near.getContractInstance( 'paras-token-v2.testnet' , {
      changeMethods: ['set_something'],
      viewMethods: ['nft_tokens_for_owner','nft_tokens']
    })
    const tokens = await this.api.nft_tokens_for_owner({account_id: this.$store.getters.account_id })
    const tokens2 = await this.api.nft_tokens({from_index: '0' , limit: 10})
    // https://ipfs.fleek.co/ipfs/
    console.log(tokens,tokens2);
    }, 50);
  }
}
export default myMixin