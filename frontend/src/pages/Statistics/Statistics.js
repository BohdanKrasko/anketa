import React, {useState, useEffect} from 'react';
import RightMenuStats from '../../Components/menu/RightMenuStats'
import TextField from '@mui/material/TextField'
import { Redirect } from "react-router-dom"

import Box from '@mui/material/Box'
import { v4 } from 'uuid'
import {
    Radio,
    Button,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    Autocomplete,
    FormControlLabel,
    CircularProgress
} from '@mui/material'
import { 
    Grid,
    Card,
    Container 
} from "@material-ui/core";

import Avatar from '@mui/material/Avatar';

import { 
    getAnaketa, 
    getAnakety, 
    getStatistic,
    getAllChildrenByAnketa,
    getAllChildrenByAnketaAndParent
  } from '../../api/client';
  
const Statistics = (props) => {
  const data = (props.location && props.location.state) || {};
  const [open, setOpen] = useState(false)
  const [anketa, setAnketa] = useState()
  const [ankety, setAnkety] = useState()
  const [anketaCompare, setAnketaCompare] = useState()
  const [child, setChild] = useState()
  const [children, setChildren] = useState([])
  const [parent, setParent] = useState()
  const [parents, setParents] = useState([])
  const [useCount] = useState(0)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState({
    anketa: false,
    child: false
  })  
  const [statistic, setStatistic] = useState([])

  useEffect(() => {
    const fetchOffsetAnketa = (token) => {
      getAnakety(token)
        .then(res => res.json())
        .then(ankety => {
          ankety.forEach( obj => renameKey( obj, 'name_of_anketa', 'label' ))
          setAnkety(ankety)
          setIsAuthorized(true);   
          setLoading(false); 
        }).catch(err => {
            setIsAuthorized(false);
            setLoading(false); 
            return err;
        })
    }
    fetchOffsetAnketa(data.token) 
  }, [useCount])

  const handleChangeAnketa = (e, value) => {
    setAnketa(value)
    if (value) {
      getAllChildrenByAnketa(value.anketa_id, data.token)
        .then(res => res.json())
        .then(children => {
          children.forEach( obj => concatKey( obj, 'surname', 'name' ))
          setChildren(children)
        })

      getAllChildrenByAnketa(value.anketa_id, data.token)
        .then(res => res.json())
        .then(data => {
          let filterData = removeDuplicates(data, item => item.parents_id)

          filterData.forEach( obj => deleteKey( obj, 'birthday'))
          filterData.forEach( obj => deleteKey( obj, 'children_id'))
          filterData.forEach( obj => deleteKey( obj, 'height'))
          filterData.forEach( obj => deleteKey( obj, 'weight'))
          filterData.forEach( obj => deleteKey( obj, 'label'))
          filterData.forEach( obj => deleteKey( obj, 'name'))
          filterData.forEach( obj => deleteKey( obj, 'surname'))
          filterData.forEach( obj => concatKey( obj, 'last_name', 'first_name' ))

          setParents(filterData)
        })
      const request = {
        anketa_id: value.anketa_id,
        token: data.token
      }
      getAnaketa(request)
        .then(res => res.json())
        .then(res => {
          setAnketaCompare(res)
        })
    } else {
      setChildren([])
      setParents([])
    }
  };

const removeDuplicates = (data, key) => {
  return [ ...new Map(data.map(item => [key(item), item])).values()]
};

  const handleChangeChild = (e, value) => {
    setChild(value)
  };

  const handleChangeParents = (e, value) => {
    setParent(value)
    if (value && anketa) {
      getAllChildrenByAnketaAndParent(anketa.anketa_id, value.parents_id, data.token)
        .then(res => res.json())
        .then(children => {
          children.forEach( obj => concatKey( obj, 'surname', 'name' ))
          setChildren(children)
        })
    } else if (anketa) {
      getAllChildrenByAnketa(anketa.anketa_id, data.token)
        .then(res => res.json())
        .then(children => {
          children.forEach( obj => concatKey( obj, 'surname', 'name' ))
          setChildren(children)
        })
    } 
  }
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleInputChange = (name, value) => {
    setError((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const checkFields = (fields) => {
    for (const val in fields) {
      if (!fields[val]) {
        handleInputChange(val, true)
        return false;
      } else {
        handleInputChange(val, false)
      }
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const fields = {
      anketa: anketa,
      child: child
    }

    if (checkFields(fields)) {
      const request = {
        anketa_id: anketa.anketa_id,
        children_id: child.children_id,
        token: data.token
      }

      getStatistic(request)
        .then(res => res.json())
        .then(res => {
          convertJson(res)
        })
    } 
  }

  const renameKey = ( obj, oldKey, newKey ) => {
    obj[newKey] = obj[oldKey]
    delete obj[oldKey]
  }

  const concatKey = ( obj, fisrt, second ) => {
    obj['label'] = obj[fisrt] + " " + obj[second]
    delete obj[fisrt];
    delete obj[second];
  }

  const deleteKey = (obj, key) => {
    delete obj[key]
  }

  const convertJson = (array) => {
    let data = {
      anketa_id: array[0].anketa_id,
      name_of_anketa: array[0].name_of_anketa,
      child_first_name: array[0].name,
      child_last_name: array[0].surname,
      parent_first_name: array[0].first_name,
      parent_last_name: array[0].last_name,
      parent_phone: array[0].phone,
      sections: []
    }
    

    for (const k_s in array) {
      let e_s = array[k_s]
      let section = {
        section_id: e_s.section_id,
        name_of_section: e_s.name_of_section,
        questions: []
      }
      let index = data.sections.findIndex(x => x.section_id === e_s.section_id)
      if (index === -1) {
        data.sections.push(section)
      }
    }

    for (const key in array) {
      let element = array[key]
      for (const k_q in data.sections) {
        let e_q = data.sections[k_q]
        let question = {
          question_id: element.question_id,
          question: element.question,
          parent_id: element.section_id,
          answers: [
            {
              list_of_answers_id: element.list_of_answers_id,
              name_of_answer: element.name_of_answer,
              parent: element.question_id
            }
          ]
        }

        if (e_q.section_id === question.parent_id) {
          e_q.questions.push(question)
        }
      }
    }

    for (const keySection in anketaCompare.sections) {
      let elementSection = anketaCompare.sections[keySection]
      for (const keyQuestion in elementSection.questions) {
        let elementQuestion = elementSection.questions[keyQuestion]
        
        for (const key in data.sections) {
          let element = data.sections[key]
          let indexSection = data.sections.findIndex(x => x.section_id === elementSection.section_id)
          
          if (indexSection === -1) {
            const newSection = {
              section_id: elementSection.section_id,
              name_of_section: elementSection.name_of_section,
              questions: []
            }
            data.sections.push(newSection)
          }

          if (element.section_id === elementSection.section_id) {
            let index = element.questions.findIndex(x => x.question_id === elementQuestion.question_id)
            if (index === -1) {
              const newQueston = {
                question_id: elementQuestion.question_id,
                question: elementQuestion.question,
                answers: [
                  {
                    name_of_answer: "Відповідь не дано"
                  }
                ]
              }
              element.questions.push(newQueston)
            }
          }
        }
        
      }
    }

    for (const keyS in data.sections) {
      let  count = {}
      let elementS = data.sections[keyS]
      for (const keyQ in elementS.questions) {
        let elementQ = elementS.questions[keyQ]
        const flag = elementQ.answers[0].name_of_answer
        count[flag] = elementS.questions.filter(x => x.answers[0].name_of_answer === flag).length
      }
      elementS.counts = count
    }
    setStatistic(data)
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 7) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
  
    return color;
  }

  if (isLoading) {
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            style={{ minHeight: "100vh" }}
        >
          <CircularProgress />
        </Grid>
    )
  }
if (!isAuthorized) {
    return <Redirect to="/signin"></Redirect>
} else {
    return (
        <div> 
            <RightMenuStats
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
                parents={data}
                // anketa={}
              />
            <Box component="form" onSubmit={handleSubmit} id="anketa" noValidate> 
                <Container>  
                <Card>
                    <Grid container spacing={3} key={v4()} direction="row" alignItems="center"> 
                        <Grid item key={v4()} md={2} lg={2}/>
                        <Grid item key={v4()} md={4} lg={4}> 
                          <Autocomplete
                            value={anketa}
                            disablePortal
                            id="combo-box-demo"
                            options={ankety}
                            sx={{ marginTop: '40px' }}
                            onChange={handleChangeAnketa}
                            renderInput={(params) => 
                              <TextField 
                                {...params} 
                                label="Виберіть анкету" 
                                helperText="Спершу виберіть анкету"
                                required
                                error={error.anketa}
                              />
                            }
                          />
                        </Grid>
                        <Grid item key={v4()} md={4} lg={4}> 
                          <Autocomplete
                            value={parent}
                            disablePortal
                            id="combo-box-demo"
                            options={parents}
                            sx={{ marginTop: '20px' }}
                            onChange={handleChangeParents}
                            renderInput={(params) => <TextField {...params} label="Виберіть батьків" />}
                          />
                        </Grid>

                        <Grid item key={v4()} md={2} lg={2}/>
                        
                        <Grid item key={v4()} md={2} lg={2}/>
                        <Grid item key={v4()} md={4} lg={4}> 
                          <Autocomplete
                            value={child}
                            disablePortal
                            id="combo-box-demo"
                            options={children}
                            sx={{ marginBottom: '20px' }}
                            onChange={handleChangeChild}
                            renderInput={(params) => 
                              <TextField 
                                {...params} 
                                required 
                                label="Виберіть дитину"
                                error={error.child}
                              />
                            }
                          />
                        </Grid>
                        <Grid item key={v4()} md={4} lg={4} style={{textAlign: 'center'}}>
                                <Button 
                                    variant="contained"
                                    type="submit"
                                    size='large'
                                    fullWidth
                                    sx={{ marginBottom: '20px' }}
                                >
                                    Статистика
                                </Button>
                        </Grid>
                        </Grid>
                    </Card>
                </Container>
                {Array.isArray(statistic.sections) && statistic.sections.length ? 
                  <Container style={{marginTop: '20px', marginBottom: '30px'}}>  
                  
                    <Grid container spacing={3} key={v4()} direction="row" alignItems="center"> 
                      <Grid item key={v4()} md={12} lg={12} xs={12}>
                        {
                          statistic.sections.map(section => {
                            let questionCount = 0
                            return (
                              <Grid item key={v4()} md={12} lg={12} xs={12} style={{marginBottom: '20px'}}>
                                <Card>
                                    <Grid item key={v4()} md={12} lg={12} xs={12} style={{backgroundColor: '#e0e0e0'}}>
                                      <div style={{
                                        color: 'rgb(145 143 143)',
                                        paddingTop: '10px',
                                        paddingBottom: '10px',
                                        paddingLeft: '10px',
                                        fontSize: '25px'
                                      }}>
                                        {section.name_of_section}
                                      </div>
                                    </Grid>
                                    <Grid item key={v4()} md={12} lg={12} xs={12} 
                                      style={{
                                        backgroundColor: '#e0e0e0',
                                        paddingBottom: '10px',
                                        paddingLeft: '10px'
                                      }} 
                                    >
                                      {
                                        Object.keys(section.counts).map(count => {
                                          return (
                                            <div key={v4()} style={{display: 'inline-flex'}}>
                                              <Avatar 
                                                key={v4()}
                                                sx={{ 
                                                  bgcolor: stringToColor(count),
                                                  marginTop: '7px'
                                                }} 
                                              >
                                                {section.counts[count]}
                                              </Avatar>
                                              <p 
                                                key={v4()}
                                                style={{
                                                  marginLeft: '6px',
                                                  marginRight: '10px',
                                                  fontSize: '18px',
                                                  color: 'rgb(145 143 143)'
                                                }}
                                              >{count}</p>
                                            </div>
                                          )
                                        })
                                      }
                                    </Grid>
                                  {
                                    section.questions.map(question => {
                                      questionCount++
                                      return (
                                        <Grid container spacing={3} key={v4()}>
                                          <Grid item key={v4()} md={12} lg={12} xs={12}>
                                            <Card>
                                              <FormControl component="fieldset">
                                                  <FormLabel component="legend">
                                                      <Typography variant="h6" gutterBottom component="div" color='inherit' style={{marginLeft: '10px'}}>
                                                          {questionCount}. {question.question}
                                                      </Typography>
                                                  </FormLabel>
                                                  <RadioGroup
                                                      aria-label="gender"
                                                      name="radio-buttons-group"
                                                      // onChange={handleChange}
                                                  >
                                                    {
                                                      question.answers.map(answer => {
                                                        return (
                                                          <FormControlLabel 
                                                              key={v4()} 
                                                              value={answer.name_of_answer} 
                                                              control={<Radio />} 
                                                              label={answer.name_of_answer} 
                                                              style={{marginLeft: '20px'}}
                                                              disabled
                                                              checked
                                                              // onChange={() => {
                                                              //     addValue(data.child.id, answer.list_of_answers_id, question.question_id)
                                                              // }}
                                                          />
                                                        )
                                                      })
                                                    }
                                                </RadioGroup>
                                              </FormControl>
                                            </Card>
                                          </Grid>
                                        </Grid>
                                      )
                                    })
                                  }
                                </Card>
                              </Grid>
                            )
                          })
                        }
                      </Grid>
                    </Grid>
                </Container> : ''
                }
                
            </Box>
            
        </div>
      );
    }
}

export default Statistics;
