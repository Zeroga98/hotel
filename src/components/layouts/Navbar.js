import { 
  Button,
  Box,
  Image,
  HStack,
  Stack,
  Flex,
  Tooltip, 
  IconButton,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";

// Icons
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgClose } from 'react-icons/cg'
import { BsTelephoneOutbound } from 'react-icons/bs'

// Custom Button component
import OutlineButton from '../../components/OutlineButton'

import Link from 'next/link'
import routes from '../../../routes'
import { useState, useEffect } from "react";


export default function Navbar({ setCode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [_routes, setRoutes] = useState(routes)

  useEffect(() => {
    window.addEventListener("message", (e) => {
      setCode({ [e.data.key]: e.data.code })
      setRoutes([..._routes, {
        path: '/new-page/' + e.data.key,
        label: e.data.name
      }])
    });
  }, []);

  return (
    <>
    <HStack
      bg='white'
      position='fixed'
      insetX={0}
      justify='center'
      p={3}
      top={0}
      zIndex={10}
      display='flex'
      opacity={0.9}
    >
      <Flex
        w='100%'
        align='center'
        justify='center'
        content='center'
      >
        <Link href='/'>
          <Button 
            _focus={{
              border: 'none'
            }}
          >
            <Tooltip
              hasArrow 
              label='Hotel 21'
              bg='secondary'
              color='primary'
              placement='auto'
            >
              <Image
                boxSize={10}
                src='logo.png'
                mx={2}
                mr={20}
                ml={-2}
                _focus={{  }}
              />
            </Tooltip>
          </Button>
        </Link>
        <Spacer />
        <IconButton
          aria-label='Open Menu'
          bg='none'
          color='black'
          outline='none'
          variant='unstyled'
          align='center'
          icon={ 
            isOpen ?
              <CgClose size={30} />
              : <GiHamburgerMenu size={30} /> 
          }
          onClick={isOpen ? onClose : onOpen}
          display={{ 
            sm: !isOpen ? 'inherit' : 'inherit',
            md: !isOpen ? 'none' : 'inherit',
            lg: !isOpen ? 'none' : 'inherit',
            xl: !isOpen ? 'none' : 'inherit',
            '2xl': !isOpen ? 'none' : 'inherit',
          }}
          _focus={{  }}
        >
        </IconButton>
        <HStack
          display={['none', 'none', 'flex', 'flex', 'flex']}
          spacing={0}
        >
        {_routes.map((route, index) => (
          <Link 
            key={index}
            href={route.path}
            passHref
          >
            <Button
              as='a'
              bg='none'
              textColor='black'
              fontWeight='bold'
              _hover={{
                textColor: 'primary',
                fontWeight: 'extrabold',
              }}
              _focus={{  }}
            >
              {route.label}
            </Button>
          </Link>
        ))}
        </HStack>
        <Spacer 
          display={['none', 'none', 'flex', 'flex', 'flex']}
        />
        <Link 
          href='/'
          passHref
          display={['none', 'none', 'flex', 'flex', 'flex']}
        >
          <OutlineButton
            display={['none', 'none', 'flex', 'flex', 'flex']}
            rightIcon=<BsTelephoneOutbound />
          >
            Réserver
          </OutlineButton>
        </Link>
      </Flex>
    </HStack>
    {isOpen ? (
      <Stack 
        bg='white'
        pb={10}
        mt={16}
        w='100%'
        position='fixed'
        zIndex={10}
        as='nav'
        spacing={4}
        align='center'
        opacity={0.9}
      >
      {_routes.map((route, index) => (
        <Link 
          key={index}
          href={route.path}
          passHref
        >
          <Button
            as='a'
            py={4}
            bg='none'
            w='100%'
            fontWeight='bold'
            onClick={onClose}
            _focus={{  }}
          >
            {route.label}
          </Button>
        </Link>
      ))}
        <Link 
          href='tel: +213 23 100 101'
          passHref
          display={['flex', 'flex', 'none', 'none', 'none']}
        >
          <OutlineButton
            display={['flex', 'flex', 'none', 'none', 'none']}
            rightIcon=<BsTelephoneOutbound />
          >
            Réserver
          </OutlineButton>
        </Link>
      </Stack>
      ) : null}
    </>
  );
};
