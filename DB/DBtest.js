const { insertProject, deleteProject, updateProject, selectProject } = require("./DB")

insertProject({title: '읽기중입력테스트', description: '읽기중입력테스트입니다.', start: '2024-01-22', finish: '2024-01-22', link: 'Link'})
//updateProject({title: '수정테스트', description: '수정테스트입니다.'}, {title: '테스트'})
//res = selectProject()
