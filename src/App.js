import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database' // If using Firebase database
import 'firebase/storage'
import firebaseConfig from './firebase'
import Clipboard from './components/Clipboard'
import { RandomPassword } from './utils/RandomPassword'
import Laptop from './assets/images/laptop.svg'
import {
  Row,
  Col,
  Layout,
  Typography,
  Checkbox,
  List,
  Input,
  Button
} from 'antd'
import 'antd/dist/antd.css'
import HttpsRedirect from 'react-https-redirect'

const { Title } = Typography
const { Content, Header } = Layout

firebase.initializeApp(firebaseConfig)
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      length: 8,
      pwd: '',
      upperCase: true,
      lowerCase: true,
      numeric: true,
      symbol: false,
      size: 'large',
      title: null,
      text: null,
      image: null
    }
  }

  getData = () => {
    const dbRef = firebase.database().ref()
    dbRef
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          this.setState({
            title: data.Title,
            text: data.text_1,
            image: data.image
          })
          // console.log(snapshot.val())
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  handleSizeChange = (e) => {
    this.setState({
      size: e.target.value
    })
  }

  componentDidMount() {
    this.getData()
    this.generatePwd()
  }
  generatePwd() {
    const { upperCase, lowerCase, numeric, symbol, length } =
      this.state
    let pwd = new RandomPassword()
      .setLength(length)
      .setLowerCase(lowerCase)
      .setUpperCase(upperCase)
      .setNumberCase(numeric)
      .setSymbol(symbol)
      .generate()
    this.setState({
      pwd
    })
  }

  handleCheckbox(e) {
    const { name, checked } = e.target
    this.setState({
      [name]: checked
    })
    // this.generatePwd();
  }

  render() {
    const { size } = this.state

    return (
      <HttpsRedirect>
        <div>
          <Layout
            style={{
              background: 'transparent'
            }}
          >
            <Header
              style={{
                backgroundColor: 'transparent'
              }}
            >
              <div>
                {this.state.image !== null ? (
                  <img
                    src={this.state.image}
                    alt="UniqurLab"
                    className="logo"
                  />
                ) : null}
              </div>
            </Header>
            <Content
              style={{
                padding: 24,
                marginTop: '5%',
                marginBottom: '5%'
              }}
            >
              <Row
                gutter={48}
                type="flex"
                justify="space-around"
                align="middle"
              >
                <Col xs={24} sm={12}>
                  <div className="pwd-box">
                    <Typography>
                      <Title
                        style={{
                          paddingBottom: '30px'
                        }}
                      >
                        {this.state.title}
                      </Title>
                    </Typography>
                    <div className="input-container">
                      <Input
                        id="input"
                        name="password"
                        type="text"
                        readOnly
                        value={this.state.pwd}
                      />
                      <div className="clipboard">
                        <Clipboard />
                      </div>
                    </div>
                    <header>
                      <h3>{this.state.text}</h3>
                    </header>
                    <Row gutter={32}>
                      <Col
                        xs={24}
                        style={{
                          marginBottom: '30px'
                        }}
                      >
                        <div>
                          <Col xs={24} sm={12}>
                            <List>
                              <List.Item>
                                <Checkbox
                                  checked={this.state.upperCase}
                                  name="upperCase"
                                  onChange={(e) =>
                                    this.handleCheckbox(e)
                                  }
                                >
                                  Большие буквы
                                </Checkbox>
                              </List.Item>
                              <List.Item>
                                <Checkbox
                                  checked={this.state.lowerCase}
                                  name="lowerCase"
                                  onChange={(e) =>
                                    this.handleCheckbox(e)
                                  }
                                >
                                  Маленькие буквы
                                </Checkbox>
                              </List.Item>
                            </List>
                          </Col>
                          <Col xs={24} sm={12}>
                            <List>
                              <List.Item>
                                <Checkbox
                                  checked={this.state.numeric}
                                  name="numeric"
                                  onChange={(e) =>
                                    this.handleCheckbox(e)
                                  }
                                >
                                  Числа
                                </Checkbox>
                              </List.Item>
                              <List.Item>
                                <Checkbox
                                  checked={this.state.symbol}
                                  name="symbol"
                                  onChange={(e) =>
                                    this.handleCheckbox(e)
                                  }
                                >
                                  Символы
                                </Checkbox>
                              </List.Item>
                            </List>
                          </Col>
                        </div>
                      </Col>
                      <Col
                        xs={24}
                        style={{
                          marginBottom: '20px'
                        }}
                      >
                        <div>
                          <Col
                            span={24}
                            style={{
                              marginBottom: '20px'
                            }}
                          >
                            <label htmlFor="email">
                              Количество символов:
                            </label>
                          </Col>
                          <Col xs={24} sm={6}>
                            <Input
                              type="number"
                              min="8"
                              max="40"
                              value={this.state.length}
                              onChange={(e) => {
                                this.setState({
                                  length: e.target.value
                                })
                                this.generatePwd()
                              }}
                            />
                          </Col>
                          <Col xs={24} sm={18}>
                            <div className="slider-container">
                              <input
                                className="slider"
                                type="range"
                                min="8"
                                max="40"
                                value={this.state.length}
                                onChange={(e) => {
                                  this.setState(
                                    {
                                      length: e.target.value
                                    },
                                    () => {
                                      this.generatePwd()
                                    }
                                  )
                                }}
                              />
                            </div>
                          </Col>
                        </div>
                      </Col>
                    </Row>
                    <div
                      style={{
                        textAlign: 'center'
                      }}
                    >
                      <Button
                        className="dark"
                        type="primary"
                        shape="round"
                        size={size}
                        onClick={() => {
                          this.generatePwd()
                        }}
                      >
                        Создать
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <object
                    aria-label="laptop"
                    type="image/svg+xml"
                    data={Laptop}
                    className="laptop"
                    id="laptop"
                  />
                </Col>
              </Row>
            </Content>
            <p
              style={{
                textAlign: 'center'
              }}
            >
              ©UniqueLab.ru, {new Date().getFullYear()}
            </p>
          </Layout>
        </div>
      </HttpsRedirect>
    )
  }
}

export default App
