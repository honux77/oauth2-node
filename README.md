# oauth2-node

Simple GitHub Oauth2 practice for Node.js

## 인증방식

- 기본 방식인 Authorization Code Grant 방식 사용
- 이 밖에도 4가지 방식이 있다.
- 깃헙은 기본 방식인 Authorization Code Grant 외에도 Device Authorization Grant도 지원한다.

### Authorizaiton Code Grant

```
     +----------+
     | Resource |
     |   Owner  |
     |          |
     +----------+
          ^
          |
         (B)
     +----|-----+          Client Identifier      +---------------+
     |         -+----(A)-- & Redirection URI ---->|               |
     |  User-   |                                 | Authorization |
     |  Agent  -+----(B)-- User authenticates --->|     Server    |
     |          |                                 |               |
     |         -+----(C)-- Authorization Code ---<|               |
     +-|----|---+                                 +---------------+
       |    |                                         ^      v
      (A)  (C)                                        |      |
       |    |                                         |      |
       ^    v                                         |      |
     +---------+                                      |      |
     |         |>---(D)-- Authorization Code ---------'      |
     |  Client |          & Redirection URI                  |
     |         |                                             |
     |         |<---(E)----- Access Token -------------------'
     +---------+       (w/ Optional Refresh Token)

   Note: The lines illustrating steps (A), (B), and (C) are broken into
   two parts as they pass through the user-agent.

                     Figure 3: Authorization Code Flow 
```
<출처: RFC6749>

## 사용한 모듈

```
express
express-handlebars
axios
```

## 참고문서

- <https://tools.ietf.org/html/rfc6749>
- <https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps>


