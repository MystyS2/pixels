import React from 'react'
import "./AppLayout.style.css";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="dark text-foreground bg-background">
      <Navbar
        isBlurred={false}
        classNames={{
          item: [
            "navbar",
            "flex",
            "relative",
            "h-full",
            "items-center",
            "max-w-screen",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-foreground",
          ],
        }}
      >
        <NavbarBrand className='cursor-pointer'>
          <Link href="/">
            <img src='https://pixelnetwork.kr/static/images/pixel_logo_white.svg' alt='' className='h-8' />
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color='foreground' href="/creators" aria-current="page">
              Creators
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/news">
              News
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify='end'>
          <Link href='https://pixelstore.kr/'>
            <Button radius='full' color="foreground" variant="bordered">
              <img src='https://pixelnetwork.kr/static/images/header_store_btn.svg' alt='' />
            </Button>
          </Link>
          <Link href='https://pixelnetwork.kr/'>
            <Button radius='full' color="foreground" variant="bordered">
              <img src='https://pixelnetwork.kr/static/images/logo-light.svg' alt='' className='h-4' />
            </Button>
          </Link>
        </NavbarContent>
      </Navbar>
      <Outlet />
    </div>
  )
}

export default AppLayout