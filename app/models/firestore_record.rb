class FirestoreRecord
  class NotFound < StandardError; end

  include ActiveModel::Model
  include ActiveModel::Attributes
  include ActiveModel::Validations
  include ActiveModel::Dirty

  attribute :id, :string, default: -> { Google::Cloud::Firestore::Generate.unique_id }
  validates :id, presence: true

  define_model_callbacks :save

  class << self
    def client
      @client ||= Google::Cloud::Firestore.new
    end

    def all
      from_query(col)
    end

    def col
      client.col(name.tableize)
    end

    def from_query(query)
      query.get.lazy.map do |document_snapshot|
        from_document_snapshot(document_snapshot)
      end
    end

    def create!(**args)
      new(**args).tap(&:save!)
    end

    def find(id)
      from_document_snapshot(col.doc(id).get).tap do |obj|
        raise NotFound.new("#{name}#id #{id.inspect} not found") unless obj
      end
    end

    def transaction(&block)
      client.transaction do |tx|
        transaction_stack.push(tx)

        begin
          block.call
        ensure
          transaction_stack.pop
        end
      end
    end

    def current_transaction
      transaction_stack.last
    end

    private

    def from_document_snapshot(document_snapshot)
      if document_snapshot.created_at
        new(document_snapshot.data.merge(id: document_snapshot.document_id))
      else
        nil
      end
    end

    def transaction_stack
      Thread.current[:__firestore_record_transaction_stack] ||= []
    end
  end

  def initialize(**attrs)
    super
    clear_changes_information
  end

  def update!(**attrs)
    self.attributes = attrs
    save!
  end

  def save!
    run_callbacks :save do
      validate!
      save
    end
  end

  def delete
    doc.delete
  end

  private

  def doc
    @doc ||= self.class.col.doc(id)
  end

  def save
    if valid?
      attrs = attributes.except('id')

      if self.class.current_transaction
        self.class.current_transaction.set(doc, attrs)
      else
        doc.set(attrs)
      end

      changes_applied

      true
    else
      false
    end
  end
end
