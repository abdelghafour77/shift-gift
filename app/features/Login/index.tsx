import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react'
import { useAuthStore } from './store/authStore'
import CustomLoadingSpinner from '../../components/shared/CustomLoadingSpinner'
import { useLogin } from './hooks/useLogin'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { BgRamSvg } from '../../assets/svg'
import oneworldLogo from '../../assets/img/oneworld_logo.png'
import ramLogo from '../../assets/img/RAM_logo.png'
import { CustomInputField } from './components/CustomInputField'
import { EmailIcon, LockIcon } from '../../components/icons'

// declare the type for TS, add in a global.d.ts if TS project
declare global {
  interface Window {
    electronAPI?: {
      getMachineSerial: () => Promise<{ source: string; serial: string | null; error?: string }>
    }
  }
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState('')

  const { handleLogin, handleAdminLogin, isLoading, isLoginPending } = useLogin({
    username,
    password,
    navigate,
    setShowError,
    setUsernameError,
  })
  const { isAuthenticated, SN, setSN } = useAuthStore()
  const hasLoginStarted = useRef(false)

  async function fetchSerial() {
    if (!window.electronAPI) {
      console.warn('electronAPI not available')
      return
    }
    try {
      const res = await window.electronAPI.getMachineSerial()
      setSN(res?.serial)
    } catch (err) {
      console.error('failed to get serial', err)
    }
  }

  useEffect(() => {
    if (hasLoginStarted.current === false && isAuthenticated !== true && SN) {
      try {
        handleLogin()
        hasLoginStarted.current = true
      } catch (err) {
        console.error('Login échoué :', err)
      }
    }
  }, [isAuthenticated, handleLogin, SN])

  useEffect(() => {
    fetchSerial()
  }, [])

  if (isLoading || !SN) {
    return <CustomLoadingSpinner />
  }

  return (
    <Box
      position="relative"
      zIndex={0}
      display="flex"
      flexDirection={'column'}
      alignItems="center"
      justifyContent={'center'}
      w="100vw"
      h="100vh"
      bg="#F9F7F5"
      color={'black'}
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        inset: 0,
        bgImage: `url(${BgRamSvg})`,
        bgRepeat: 'repeat',
        bgSize: '332px 353px',
        opacity: 0.04,
        zIndex: -1,
      }}
    >
      <VStack
        w={'464px'}
        h={'600px'}
        gap={12}
        align="center"
        zIndex={100}
        justifyContent={'center'}
        alignItems={'center'}
        background={'#FFFFFF'}
        box-shadow={'0px 0px 24px 0px #0000001A'}
        borderRadius={'10px'}
        paddingX={'50px'}
      >
        <VStack gap={7} textAlign="center">
          <Flex align="center" gap={2}>
            <Image src={ramLogo} h={76} w="auto" />
            <Image src={oneworldLogo} h={54} w="auto" />
          </Flex>
          <VStack gap={2}>
            <Text
              textTransform={'uppercase'}
              fontWeight={'300'}
              fontSize="18px"
              lineHeight="100%"
              letterSpacing={'10%'}
              color={'#634959'}
            >
              Backoffice
            </Text>
            <Text
              fontFamily={'Bebas Neue, sans-serif'}
              color={'RAM.red'}
              fontSize={'34px'}
              fontWeight={'800'}
              textTransform={'uppercase'}
              lineHeight="100%"
            >
              Pointage Digital
            </Text>
          </VStack>
        </VStack>

        <VStack position="relative" gap={4} w="100%" align="stretch">
          <CustomInputField
            type="text"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value)
              if (usernameError) setUsernameError(null)
            }}
            placeholder={'Identifiant'}
            icon={<EmailIcon boxSize="4" />}
          />
          {usernameError && (
            <Text mt={-4} alignSelf="flex-end" fontSize={13}>
              {usernameError}
            </Text>
          )}
          <CustomInputField
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder={'********'}
            icon={<LockIcon boxSize="4" />}
            showPasswordToggle
          />
          <Button
            variant={isLoginPending ? 'disabled' : 'primary'}
            w="100%"
            mt={5}
            fontSize="xs"
            onClick={handleAdminLogin}
            disabled={isLoginPending}
          >
            se connecter
          </Button>

          <Text fontSize="sm" textAlign="center">
            Created with ❤️ by Digital Factory
          </Text>

          {showError && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {showError}
            </Text>
          )}

          {isLoginPending && (
            <Flex position="absolute" bottom="-80px" left={0} right={0} justify="center">
              <CustomLoadingSpinner />
            </Flex>
          )}
        </VStack>
      </VStack>
    </Box>
  )
}
