import AV from './av-weapp-min.js'
import utils from './utils'



export default {
    user: null,
    
    openid: 0,
    
    setTableContent () {
        const Content = AV.Object.extend('content')
        return new Content()
    },
    
    setComment () {
        const Comment = AV.Object.extend('comment')
        return new Comment()
    },
    
    commonField () {
        return {
            user: this.user,
            openid: this.openid
        }
    },
    
    queryBy (dataType, isOwn = true, limit, limitCondition) {
        let queryContent
        let queryContent2
        let query
        
        if (dataType) {
            queryContent = new AV.Query('content')
            queryContent.equalTo('dataType', dataType)
            query = queryContent
        }
        
        if (isOwn) {
            queryContent2 = new AV.Query('content')
            queryContent2.equalTo('openid', this.openid)
            query = queryContent2
        }
        
        if (dataType && isOwn) {
            query = AV.Query.and(queryContent, queryContent2)
        }
        
        if (limit) {
            query.lessThanOrEqualTo('createdAt', limitCondition)
            query.limit(limit)
        }
    
        query.descending('createdAt')
        return query.find()
    },
    
    queryById (id) {
        return new AV.Query('content').get(id)
    },
    
    queryByArray (arr) {
        arr = arr.map(id => '"' + id + '"')
        let sql = 'select * from comment where contentId in (' + arr.join(',') + ')'
        return AV.Query.doCloudQuery(sql)
    }
}
