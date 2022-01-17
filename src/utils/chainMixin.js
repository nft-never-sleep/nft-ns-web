var myMixin = {
  data(){
    return{
      api: null,
    }
  },
  methods: {
    //构建API对象用以调用
    async ContractInstance() {
      this.api = await this.$near.getContractInstance( 'paras-token-v2.testnet' , {
        changeMethods: ['set_something'],
        viewMethods: [
          'nft_tokens_for_owner',//指定account_id下nft详细信息
          'nft_tokens',//ntf列表
        ]
      })
      // console.log(this.$store.getters.account_id);
      // const tokens = await this.useApi('nft_tokens_for_owner',{account_id: this.$store.getters.account_id })
      const tokens2 = await this.api.nft_tokens({from_index: '0' , limit: 10})
      // https://ipfs.fleek.co/ipfs/
      console.log(tokens2);
    },
    //调用api，分别传入API名称和传入参数
    async useApi(apiName,data){
      let chainRes = null
      let promise = () => {
        return new Promise((resolve , reject) =>{
          try {
            setTimeout(async() => {
              chainRes = await this.api[apiName](data)
              resolve(chainRes)              
            }, 40);
          } catch (error) {
            reject(error)
          }
        })
      }

      let res = await promise()
      if (res) {
        return res
      }else{
        return err
      }
    }
  },
  mounted(){
    setTimeout(() => {
      this.ContractInstance()
    }, 40);
  }
}
export default myMixin