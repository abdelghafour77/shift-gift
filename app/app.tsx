import React from 'react'
import { HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import { Provider } from './config/provider'
import { Box } from '@chakra-ui/react'
import AppRouter from './router/AppRouter'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        if (!error.response) return false
        if ([401, 403].includes(error.response?.status)) return failureCount < 3
        return false
      },
    },
  },
})

export default function App() {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18next}>
          <HashRouter>
            <Provider>
              <Box>
                <AppRouter />
              </Box>
            </Provider>
          </HashRouter>
        </I18nextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.Fragment>
  )
}
