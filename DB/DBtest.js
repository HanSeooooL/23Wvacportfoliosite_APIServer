const { insertProject, deleteProject, updateProject, selectProject, insertExAc, selectExAc, insertCareer, selectCareer, insertTeQu, selectTeQu, insertLaCe, selectLaCe, insertContact, selectContact } = require("./DB")

//insertProject({title: '읽기중입력테스트', description: '읽기중입력테스트입니다.', start: '2024-01-22', finish: '2024-01-22', link: 'Link'})
//updateProject({title: '수정테스트', description: '수정테스트입니다.'}, {title: '테스트'})
//res = selectProject()

//insertExAc({title: '대내외활동테스트', host: '대내외활동테스트주관', start: '2024-01-22', finish: '2024-01-22', awarded: '특대'})
//res = selectExAc()

//insertCareer({comp_name: 'TestCorp', start:'2024-01-23', finish:'2024-01-23', department:'부서', responsibilities:'담당업무', certificate:'증명서 경로'})
//res = selectCareer()

//insertTeQu({name: '테스트자격증', host: '테스트주관기관', acquisition_date: '2024-01-23', certificate: '링크'})
//res =selectTeQu()

//insertLaCe({name: '테스트어학자격증', host: '테스트주관기관', score: '120', acquisition_date: '2024-01-23', certificate: '링크'})
//res = selectLaCe()

//insertContact({category: 'Instagram', detail: 'sssseol'})
res = selectContact()