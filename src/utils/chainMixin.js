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
          'nft_supply_for_owner',//根据account_id获取nft数量
          'nft_total_supply',//nft总量
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
          'list_bids_by_sender',//根据AccountId获取报价列表
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
    },
    digitalProcessing(value){
      let yocto = value * 1e24
      let data = [0,0,0]
      // console.log(value , yocto);
      // data[0] = parseInt(yocto / 1e16).toString()
      // data[1] = parseInt((yocto - (data[0] * 1e16 )) / 1e8).toString()
      // data[2] = parseInt(yocto - (data[0] * 1e16 + data[1] * 1e8)).toString()
      // for (let index = 0; index < data.length; index++) {
      //   const L = 4 - data[index].length
      //   for (let index2 = 0; index2 < L; index2++) {
      //     data[index] = '0' + data[index]
      //   }
      // }
      // console.log(value.toString().length , (data[0] * 1e16 + data[1] * 1e8));
      // return data[0] + data[1] + data[2]

      let value_ = value.split(".")
      if (value_[1]) {
        let r = value_[1].length
        for (let index = 0; index < r; index++) {
          if (value_[1][0] === '0') {
            value_[1] = value_[1].substr(1)
          }
        }
        console.log(value_[1].length);
        for (let index = 0; index < (23 - r); index++) {
          value_[1] += '0'
        }
        value_[0] = value_[0] === '0' ? '' : value_[0]
        console.log(1);
      }else if (value_[0] !== '0') {
        console.log(2);
        value_.push('00000000000000000000000')
      }else{
        console.log(3);
        value_.push('')
      }
      return value_[0] + value_[1]
    }
  },
  mounted(){
    setTimeout(() => {
      this.ContractInstance()
    }, 40);
  }
}
export default myMixin