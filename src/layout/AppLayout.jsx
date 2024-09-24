import React from 'react';
import './AppLayout.style.css';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
import { Outlet, useLocation } from 'react-router-dom';

const AppLayout = () => {
  const location = useLocation(); // 현재 경로를 가져옴

  // 경로가 현재 URL과 일치하면 'active' 클래스를 반환
  const isActive = (path) => location.pathname === path;

  return (
    <div className="dark text-foreground bg-background">
      <Navbar
        isBlurred={false}
        classNames={{
          item: [
            'navbar',
            'flex',
            'relative',
            'h-full',
            'items-center',
            'max-w-screen',
            "data-[active=true]:after:content-['']",
            'data-[active=true]:after:absolute',
            'data-[active=true]:after:bottom-0',
            'data-[active=true]:after:left-0',
            'data-[active=true]:after:right-0',
            'data-[active=true]:after:h-[2px]',
            'data-[active=true]:after:rounded-[2px]',
            'data-[active=true]:after:bg-foreground',
          ],
        }}
      >
        <NavbarBrand className="cursor-pointer">
          <Link href="/">
            <img
              src="https://pixelnetwork.kr/static/images/pixel_logo_white.svg"
              alt="Pixel Network Logo"
              className="h-8"
            />
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link
              color="foreground"
              href="/"
              className={isActive('/') ? 'active-link' : ''}
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href="/creators"
              className={isActive('/creators') ? 'active-link' : ''}
            >
              Creators
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href="/news"
              className={isActive('/news') ? 'active-link' : ''}
            >
              News
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <Link href="https://pixelstore.kr/">
            <Button radius="full" color="foreground" variant="bordered">
              <img
                src="https://pixelnetwork.kr/static/images/header_store_btn.svg"
                alt="Store"
              />
            </Button>
          </Link>
          <Link href="https://pixelnetwork.kr/">
            <Button radius="full" color="foreground" variant="bordered">
              <img
                src="https://pixelnetwork.kr/static/images/logo-light.svg"
                alt="Pixel Network"
                className="h-4"
              />
            </Button>
          </Link>
        </NavbarContent>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
