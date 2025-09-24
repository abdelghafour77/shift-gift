import { Button, Center, Flex, Text } from '@chakra-ui/react'
import { TableBackoffice } from '../../components/shared/Table'
import type { ColumnsDef } from '../../types/columnDef.type'
import { useGlobalStore } from '../../store/globalStore'
import Header from './components/header'
import CustomLoadingSpinner from '../../components/shared/CustomLoadingSpinner'
import SidebarBg from '../../assets/img/sidebar-bg.png'
import { useCreateShiftQuery, useFetchDurationQuery, useFetchShiftsQuery } from './hooks/PointageQuerries'
import { useEffect, useState } from 'react'
import { LuMousePointerClick, LuRefreshCw, LuTimer } from 'react-icons/lu'
import CustomPagination from '../../components/shared/Pagination'
import { CustomInput } from '../../components/shared/CustomInput'
import CustomButton from '../../components/shared/CustomButton'
import { parseDuration } from '../../utils/trannsformDate'
import { useAuthStore } from '../Login/store/authStore'

const columnsDef: ColumnsDef = [
  { accessorKey: 'shiftDate', header: 'Date de pointage', center: true },
  { accessorKey: 'shiftHour', header: 'Heure de pointage', center: true },
  { accessorKey: 'sens', header: 'Sens', center: true },
]

const params = {
  startDate: '',
  endDate: '',
}

export default function PointagePage() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState<any>(params)
  const currentFilter = filter

  const { collaborator } = useGlobalStore()
  const { SN } = useAuthStore()

  const createShiftMutate = useCreateShiftQuery(SN ?? '')
  const handleCreateShift = async () => {
    await createShiftMutate.mutateAsync().then(() => {
      refetch()
      refetchDuration()
    })
  }

  const {
    data: shiftData,
    isLoading,
    refetch,
  } = useFetchShiftsQuery({
    ...currentFilter,
    currentPage: currentPage,
    size: 10,
    SN: SN ?? 'hellooo',
  })

  const { data: durationData, isLoading: isLoadingDuration, refetch: refetchDuration } = useFetchDurationQuery(SN ?? '')

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleDropDownChange = (name: string, value: string | number) => {
    setFilter((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleReset = () => {
    setFilter(params)
    setCurrentPage(1)
  }

  const [localDuration, setLocalDuration] = useState(0)
  const [formattedDuration, setFormattedDuration] = useState('0h 0min')

  const color = localDuration < 8 ? '#B02736' : '#008B60'

  useEffect(() => {
    if (!durationData?.duration || !shiftData?.content?.length) return

    const today = new Date().toISOString().split('T')[0]
    const todaysShifts = shiftData.content.filter((shift) => shift.shiftDate === today)

    if (!todaysShifts.length) return
    const lastShift = todaysShifts[0]
    const durationInfo = parseDuration(durationData.duration)
    setLocalDuration(durationInfo.hours)
    setFormattedDuration(durationInfo.formatted)

    if (lastShift.sens !== 'ENTREE') return

    const interval = setInterval(() => {
      setLocalDuration((prev) => {
        const newHours = prev + 1 / 60
        setFormattedDuration(`${Math.floor(newHours)}h ${Math.floor((newHours % 1) * 60)}min`)
        return newHours
      })
    }, 60000)

    return () => clearInterval(interval)
  }, [durationData, shiftData])

  useEffect(() => {
    const refetchInterval = setInterval(() => {
      refetchDuration()
    }, 300000)

    return () => clearInterval(refetchInterval)
  }, [refetchDuration])

  if (!collaborator || isLoadingDuration) {
    return <CustomLoadingSpinner />
  }

  return (
    <Flex flexDirection={'column'} h={'100%'} w={'100%'} gap={'50px'} p={'2rem'}>
      <Header collaborator={collaborator} />
      <Flex w={'100%'} position="relative">
        <Button
          position={'absolute'}
          top="-30px"
          left="45%"
          width={'160px'}
          borderRadius={'20px'}
          variant={'primary'}
          disabled={isLoading || createShiftMutate?.isPending}
          onClick={handleCreateShift}
        >
          Pointer
          <LuMousePointerClick color="white" />
        </Button>
        <Flex
          bgImage={`url(${SidebarBg})`}
          bgSize="cover"
          boxShadow={'4px 0px 12px 0px #EAEAEA'}
          border={'1px solid #B4936033'}
          bgColor={'#F9F7F5'}
          borderRadius={'8px'}
          py={10}
          px={12}
          justifyContent={'space-between'}
          alignItems={'center'}
          flexDirection={'column'}
          w={'100%'}
          gap={'10px'}
        >
          <Flex w={'100%'} justifyContent={'space-between'} alignItems={'start'}>
            <Text fontSize={'18px'} fontWeight={'700'} textTransform={'uppercase'} color={'#B02736'}>
              Liste des pointages
            </Text>
            <Text
              fontSize={'18px'}
              fontWeight={'700'}
              color={color}
              display={'flex'}
              justifyContent={'start'}
              alignItems={'center'}
              gap={'4px'}
            >
              <LuTimer color={color} size={'20px'} />
              {formattedDuration}
            </Text>
          </Flex>
          <Flex w={'100%'} justifyContent={'start'} gap={'10px'} alignItems={'end'}>
            <CustomInput
              label={'Date'}
              placeholder={'Type here'}
              value={filter.startDate}
              type={'date'}
              onChange={(e) => handleDropDownChange('startDate', e.target.value)}
            />
            <CustomInput
              placeholder={'Type here'}
              value={filter.endDate}
              type={'date'}
              onChange={(e) => handleDropDownChange('endDate', e.target.value)}
            />
            <CustomButton
              color="white"
              fontWeight="400"
              bgColor={'RAM.purple'}
              w={'fit-content'}
              fontSize={'11px'}
              textTransform={'none'}
              borderRadius={'2px'}
              h={'40px'}
              boxShadow={'0px 2px 2px 0px #00000040 inset'}
              onClick={handleReset}
            >
              <LuRefreshCw color="white" />
              {'Réinitialiser'}
            </CustomButton>
          </Flex>
          {createShiftMutate?.isPending || isLoading ? (
            <Flex justifyContent={'center'} alignItems={'center'} w={'100%'}>
              <CustomLoadingSpinner />
            </Flex>
          ) : (
            <TableBackoffice columnsDef={columnsDef} dataTable={shiftData?.content || []} />
          )}
          <Center marginTop={'1rem'}>
            <CustomPagination
              onPageChange={handlePageChange}
              totalElements={shiftData?.totalElements}
              currentPage={currentPage}
            />
          </Center>
        </Flex>
      </Flex>
    </Flex>
  )
}
