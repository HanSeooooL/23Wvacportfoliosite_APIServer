const { insertProject, deleteProject, updateProject, selectProject, insertExAc, selectExAc } = require("./DB")

//insertProject({title: '읽기중입력테스트', description: '읽기중입력테스트입니다.', start: '2024-01-22', finish: '2024-01-22', link: 'Link'})
//updateProject({title: '수정테스트', description: '수정테스트입니다.'}, {title: '테스트'})
//res = selectProject()

//insertExAc({title: '대내외활동테스트', host: '대내외활동테스트주관', start: '2024-01-22', finish: '2024-01-22', awarded: '특대'})

res = selectExAc()