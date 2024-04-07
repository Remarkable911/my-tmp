import Mock from "mockjs";

Mock.mock('http://192.168.43.139:8000/home/getData', 'get', function () {
    // console.log('http://192.168.43.139:8000/home/getData')
    return {
        code: 200,
        data: {
            orderNum: 1,
            addOrder: 2,
            link: {
                linkId: 3,
                linkTime: 4,
                linkStatus: 5,

            },
            linkTable: [{
                linkId: 6,
                linkTraffic: 7,
            },{
                linkId: 8,
                linkTraffic: 9,
            } ],
            netTable:{
                "nodes":[{
                    "name":"260735"
                },{
                    "name":"242154"
                }],
                "edges":[
                    {
                        "source":"260735",
                        "target":"242154",
                    }
                ]
            }


        }
    }
})