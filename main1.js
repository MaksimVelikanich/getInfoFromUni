const DB = [
    {
      p_key: 'CONFIG',
      s_key: 'main',
      data: {
        unis: [
          {
            uni: 'STG',
            urlPrefix: 'https://stg.com',
            studentUrl: 'https://{STUDENT_NUMBER}.stg.com',
            adminLink: 'https://admin-{ADMIN_NUMBER}.stg.com',
          },
          {
            uni: 'OI',
            urlPrefix: 'https://oi.com',
            studentUrl: 'https://{STUDENT_NUMBER}.oi.com',
            adminLink: 'https://admin-{ADMIN_NUMBER}.oi.com',
          },
        ],
      },
    },
  
    { p_key: 'STG#CONFIG', university_name: 'Staging' },
    { p_key: 'OI#CONFIG', university_name: 'Oxford international' },
  
    { p_key: 'STG#1000', s_key: 'STUDENT_DETAILS', data: { name: 'name - 1' } },
    { p_key: 'OI#2000', s_key: 'STUDENT_DETAILS', data: { name: 'name - 2' } },
    { p_key: 'STG#4000', s_key: 'STUDENT_DETAILS', data: { name: 'name - 4' } },
    { p_key: 'STG#5000', s_key: 'STUDENT_DETAILS', data: { name: 'name - 5' } },
  
    { p_key: 'STG#1000', s_key: 'FINANCE', data: { deposit: 200 } },
    { p_key: 'OI#2000', s_key: 'FINANCE', data: { deposit: 400 } },
    { p_key: 'STG#4000', s_key: 'FINANCE', data: { deposit: 700 } },
    { p_key: 'STG#5000', s_key: 'FINANCE', data: { deposit: 100 } },
  
    { p_key: 'OI#MANAGER', s_key: 'main', hasAccess: ['2000'] },
    { p_key: 'STG#MANAGER', s_key: 'main', hasAccess: ['4000'] },
  
    { p_key: 'STG#1000', s_key: 'USER#STUDENT' },
    { p_key: 'OI#2000', s_key: 'USER#STUDENT' },
    { p_key: 'ADM#STG#3000', s_key: 'USER#ADMIN' },
    { p_key: 'STG#4000', s_key: 'USER#STUDENT' },
    { p_key: 'STG#5000', s_key: 'USER#STUDENT' },
    { p_key: 'ADM#OI#6000', s_key: 'USER#ADMIN' },
  ];
  
  const getAllUsersByUni = (uni) => {
      const check = DB.find((item) => item.p_key === 'CONFIG').data.unis.find((item) => item.uni === uni);
      if (!check) {
        return 'something is wrong...';
      }

      const config = DB.find((item) => item.p_key === 'CONFIG');
      const uniConfig = config.data.unis.find((item) => item.uni === uni);
      const UniConfig =  DB.find((item) => item.p_key === `${uni}#CONFIG`);

      const numberStConfig = DB.find((item) => item.p_key === `${uni}#MANAGER`)
      
      
      const shortcode = uniConfig.uni;
      const uniUrl = uniConfig.urlPrefix;
      const Uni = UniConfig.university_name;

      const studentNumber = numberStConfig.hasAccess[0];

      const nameConfig = DB.find((item) => item.p_key === `${uni}#${studentNumber}`)
      const depositConfig = DB.find((item) => item.p_key === `${uni}#${studentNumber}` && item.s_key === `FINANCE`)
      const studentUrlPlaceholderConfig = DB.find((item) => item.p_key === 'CONFIG').data.unis.find((item) => item.uni === uni)

      const name = nameConfig.data.name;
      const deposit =depositConfig.data.deposit;
      const studentUrlPlaceholder = studentUrlPlaceholderConfig.studentUrl;
      const studentUrl = studentUrlPlaceholder.replace('{STUDENT_NUMBER}', studentNumber);

      const idConfig = DB.find((item) => item.s_key === 'USER#ADMIN' && item.p_key.includes(`ADM#${uni}`))

      const id = idConfig.p_key.split('#')[2];
      const adminLinkPlaceholder = studentUrlPlaceholderConfig.adminLink;
      const adminLink = adminLinkPlaceholder.replace('{ADMIN_NUMBER}', id);

      const info = {
        uni: Uni,
        shortCode: shortcode,
        uniUrl: uniUrl,
        students:[{
          studentNumber:studentNumber,
          uni:shortcode,
          name:name,
          deposit:deposit,
          studentUrl:studentUrl,
        },
      ],
      admins:{
        shortcode: 'ADM',
        list:[
          {
            id:id,
            link:adminLink,
            students:[{
              studentNumber:studentNumber,
              studentUrl:studentUrl,
            }]
          }
        ]
      }
      };
      return info, JSON.parse(JSON.stringify(info)), JSON.stringify(info, null, 4);
    }

    const stgUsers = getAllUsersByUni('OI');
    
  console.log(stgUsers);