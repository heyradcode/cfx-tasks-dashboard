import { Popover, Transition } from "@headlessui/react";
import React from "react";

interface Props {
	button: React.ReactNode;
	children:
		| React.ReactNode
		| ((props: { open: boolean; close: () => void }) => React.ReactElement);
}

export function PopoverButton({ button, children }: Props) {
	return (
		<Popover className="relative z-50">
			<Popover.Button className="outline-none border-none">{button}</Popover.Button>
			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<Popover.Panel className="absolute top-2 right-auto translate-x-[-55%] md:right-0 md:transform-none w-52 max-h-80 bg-white rounded-md shadow flex-col justify-start items-center inline-flex z-50">
					{children}
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}
