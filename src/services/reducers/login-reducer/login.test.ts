import React from 'react'
import {rest} from 'msw'
//import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'

import { logIn, logOut } from './login'