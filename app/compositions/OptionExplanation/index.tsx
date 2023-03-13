import { PropsWithChildren, useState } from "react";
import { ToolTip, links as tooltipStyles } from "../../ui/Tooltip";
import styles from "./styles.css";

export type OptionExplanationProps = {
	tooltip: {
		id: string;
		open: string | null;
		setOpen: (id: string | null) => void;
		title: string;
		text: string;
	};
	children: (props: {
		open: string | null;
		setOpen: (id: string | null) => void;
	}) => React.ReactNode;
};

export function links() {
	return [...tooltipStyles(), { rel: "stylesheet", href: styles }];
}

export const OptionExplanation = ({
	tooltip: { id, open, setOpen, title, text },
	children,
}: OptionExplanationProps) => {
	return (
		<section className="option-explanation-container">
			{open === id && (
				<ToolTip
					title={title}
					text={text}
					onClose={() => setOpen(null)}
				/>
			)}
			{children({ open, setOpen })}
		</section>
	);
};
