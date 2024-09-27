export class ValidatorMiddleware {
  constructor ({ schema }) {
    this.schema = schema
  }

  validateSchema = async (req, res, next) => {
    try {
      const result = await this.schema.parse(req.body)
      if (!result.success) {
        return res.status(400).json({ message: result.error.details[0].message })
      }
      next()
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
