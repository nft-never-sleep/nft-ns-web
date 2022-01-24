var myMixin = {
  data(){
    return{
      parasApi: null,
      nnsApi:null,
      parasContract: process.env.NODE_ENV === 'development' ? 'paras-token-v2.testnet' : 'x.paras.near',
      nnsContract: process.env.NODE_ENV === 'development' ? 'nns.dipoletech.testnet' : 'nns.dipoletech.testnet',
    }
  },
  methods: {
    //构建API对象用以调用
    async ContractInstance() {
      this.parasApi = await this.$near.getContractInstance( this.parasContract , {
        changeMethods: [],
        viewMethods: [
          'nft_tokens_for_owner',//指定account_id下nft详细信息
          'nft_tokens',//ntf列表
          'nft_token',//根据token_id获取制定nft信息
          'nft_supply_for_owner',//根据token_id获取nft数量
        ]
      })
      this.nnsApi = await this.$near.getContractInstance( this.nnsContract , {
        changeMethods: [
          'offer_bid',//发送报价
          'take_offer',//同意报价
          'claim_nft',//确认支付
        ],
        viewMethods: [
          'list_bids_by_nft',//根据token_id获取报价列表
        ]
      })
      // console.log(this.$store.getters.account_id);
      // const tokens = await this.useApi('offer_bid',{account_id: this.$store.getters.account_id })
      // const tokens2 = await this.api.nft_tokens({from_index: '0' , limit: 10})
      // https://ipfs.fleek.co/ipfs/
      // console.log(tokens2);
    },
    //调用api，分别传入API名称和传入参数
    async useParasApi(apiName , data , attachedGAS , attachedDeposit){
      if (this.$store.getters.account_id) {
        let chainRes = null
        let promise = () => {
          return new Promise((resolve , reject) =>{
            try {
              setTimeout(async() => {
                if (attachedGAS && attachedDeposit) {
                  chainRes = await this.parasApi[apiName](data , attachedGAS , attachedDeposit)
                }else{
                  chainRes = await this.parasApi[apiName](data)
                }
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
      }else{
        await this.$near.loginAccount()
      }
    },
    async useNnsApi(apiName , data , attachedGAS , attachedDeposit){
      if (this.$store.getters.account_id) {
        let chainRes = null
        let promise = () => {
          return new Promise((resolve , reject) =>{
            try {
              setTimeout(async() => {
                if (attachedGAS && attachedDeposit) {
                  chainRes = await this.nnsApi[apiName](data , attachedGAS , attachedDeposit)
                }else{
                  chainRes = await this.nnsApi[apiName](data)
                }
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
      }else{
        await this.$near.loginAccount()
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