- Why transition transform does not work like this ?

          <Button>
            Platform Launch
            <ChevronDown
              data-state={isOpen ? "opened" : "closed"}
              className="rotate-0 data-[state=opened]:rotate-180 transition-transform"
            />
          </Button>

          but works when i do this?

                    <Button className="[&>*]:transition-transform">
            Platform Launch
            <ChevronDown
              data-state={isOpen ? "opened" : "closed"}
              className="rotate-0 data-[state=opened]:rotate-180 "
            />
          </Button>
