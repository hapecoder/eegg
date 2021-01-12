'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getModel() {
    const {
      ctx,
    } = this;
    if (ctx.request.path.startsWith('/api/images')) {
      return ctx.model.Image;
    } else if (ctx.request.path.startsWith('/api/tags')) {
      return ctx.model.Tag;
    } else if (ctx.request.path.startsWith('/api/bms')) {
      return ctx.model.Bms;
    }
  }

  async index() {
    const {
      ctx,
    } = this;
    const {
      query,
      aggregate,
    } = ctx.request.query;
    const query2 = ctx.request.headers['X-Query-Str'];
    const aggregate2 = ctx.request.headers['X-Aggregate-Str'];
    const questr = query || query2;
    const aggstr = aggregate || aggregate2;
    // ctx.logger.info(ctx.request.path);
    try {
      const qstr = questr || aggstr;

      const buff = Buffer.from(qstr || '{}', 'base64');
      ctx.logger.info(buff.toString());
      const q = JSON.parse(buff.toString() || '{}');
      const model = await this.getModel();

      if (!model) {
        ctx.status = 400;
        return;
      }

      if (!aggstr) {
        q.limit = isNaN(Number(q.limit)) ? 10 : Number(q.limit || 10);
        const total = await model.find(q.find || {}).count();
        const ret = await model.find(q.find || {}).sort(q.sort || {
            _id: -1,
          }).skip(Number(q.skip))
          .limit(Math.min(q.limit, 100));

        const vv = ret.map(s => {
          return {
            id: s.id,
            info: s.info || s.soc,
            createtime: s._id.getTimestamp(),
            path: s.path || s.soh,
          };
        });
        ctx.body = {
          data: vv,
          total,
        };
      } else {
        if (!Array.isArray(q)) {
          ctx.status = 400;
          return;
        }
        const ret = await model.aggregate(q);
        ctx.body = {
          data: ret || {},
        };
      }
    } catch (error) {
      ctx.status = 400;
      ctx.logger.error(error);
    }

  }

  async new() {
    await this.create();
  }

  async create() {
    const {
      ctx,
    } = this;
    const data = ctx.request.body;
    const model = await this.getModel();
    if (!data || !model) {
      ctx.status = 400;
      return;
    }
    let isValid = true;
    if (Array.isArray(data)) {
      if (data.length < 1 || !data[0].info) {
        isValid = false;
      }
    } else if (!data.info) {
      isValid = false;
    }
    if (!isValid) {
      ctx.body = "must have 'info' property";
      ctx.status = 400;
      return;
    }

    try {
      ctx.logger.info(data);
      const ret = await model.create(data);
      ctx.body = ret || {};
    } catch (error) {
      ctx.status = 400;
      ctx.logger.error(error);
    }
  }

  async show() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const model = await this.getModel();
    if (!id || !model) {
      ctx.status = 400;
      return;
    }
    try {
      ctx.logger.info(id);
      const ret = await model.findById(id);
      ctx.body = ret || {};
    } catch (error) {
      ctx.status = 400;
      ctx.logger.error(error);
    }
  }

  async edit() {
    await this.update();
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const data = ctx.request.body;
    ctx.logger.info(data);
    const model = await this.getModel();
    if (!id || !data || !model) {
      ctx.status = 400;
      return;
    }
    try {
      ctx.logger.info(id);
      const ret = await model.findByIdAndUpdate(id, data);
      ctx.body = ret || {};
    } catch (error) {
      ctx.status = 400;
      ctx.logger.error(error);
    }
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const model = await this.getModel();
    if (!id || !model) {
      ctx.status = 400;
      return;
    }
    try {
      ctx.logger.info(id);
      const ret = await model.findByIdAndRemove(id);
      ctx.body = ret || {};
    } catch (error) {
      ctx.status = 400;
      ctx.logger.error(error);
    }
  }
}

module.exports = HomeController;