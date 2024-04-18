import Mock from "mockjs";
import mockServe from "./mockServe";
Mock.mock('/api/home', 'get', function () {
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
Mock.mock('/api/login','post',mockServe.postLogin)

