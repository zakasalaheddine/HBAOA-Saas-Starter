import type { NotFoundHandler } from "hono";
import * as HTTP_STATUS_CODES from "@/utils/http-status-codes";
import { HttpStatusPhrases } from "@/utils/http-status-phrases";

const notFound: NotFoundHandler = (c) => {
	return c.json(
		{
			message: `${HttpStatusPhrases.NOT_FOUND} - ${c.req.path}`,
		},
		HTTP_STATUS_CODES.NOT_FOUND,
	);
};

export default notFound;
