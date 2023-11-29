// Root
export const LocaleText={
    noRowsLabel: 'Satır Yok',
    
    noResultsOverlayLabel: 'Sonuç Bulunamadı.',
    errorOverlayDefaultLabel: 'Bir hata oluştu.',
    
    // Density selector toolbar button text
    toolbarDensity: 'Yoğunluk',
    toolbarDensityLabel: 'Yoğunluk',
    toolbarDensityCompact: 'Sıkı',
    toolbarDensityStandard: 'Normal',
    toolbarDensityComfortable: 'Yayık',
    
    // Columns selector toolbar button text
    toolbarColumns: 'Sütunlar',
    toolbarColumnsLabel: 'Satır Seç',
    
    // Filters toolbar button text
    toolbarFilters: 'Filtreler',
    toolbarFiltersLabel: 'Filtreleri Göster',
    toolbarFiltersTooltipHide: 'Filtreleri Gizle',
    toolbarFiltersTooltipShow: 'Filtreleri Göster',
    toolbarFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} aktif filtreler` : `${count} aktif filtre`,
    
    // Quick filter toolbar field
    toolbarQuickFilterPlaceholder: 'Ara…',
    toolbarQuickFilterLabel: 'Ara',
    toolbarQuickFilterDeleteIconLabel: 'Temizle',
    
    // Export selector toolbar button text
    toolbarExport: 'Dışarı Çıkar',
    toolbarExportLabel: 'Dışarı Çıkar',
    toolbarExportCSV: 'CSV olarak İndir',
    toolbarExportPrint: 'Yazdır',
    toolbarExportExcel: 'Excel olarak İndir',
    
    // Columns panel text
    columnsPanelTextFieldLabel: 'Sütun Bul',
    columnsPanelTextFieldPlaceholder: 'Sütun Başlığı',
    columnsPanelDragIconLabel: 'Sütunu Tekrar Derle',
    columnsPanelShowAllButton: 'Hepsini Göster',
    columnsPanelHideAllButton: 'Hepsini Gizle',
    
    // Filter panel text
    filterPanelAddFilter: 'Filtre Ekle',
    filterPanelDeleteIconLabel: 'Sil',
    filterPanelLinkOperator: 'Mantık Operatörü',
    filterPanelOperators: 'Operatör', // TODO v6: rename to filterPanelOperator
    filterPanelOperatorAnd: 'Ve',
    filterPanelOperatorOr: 'Ya da',
    filterPanelColumns: 'Sütunlar',
    filterPanelInputLabel: 'Değer',
    filterPanelInputPlaceholder: 'Filtre Değeri',
    
    // Filter operators text
    filterOperatorContains: 'içeriyor',
    filterOperatorEquals: 'eşittir',
    filterOperatorStartsWith: 'ile başlıyor',
    filterOperatorEndsWith: 'ile bitiyor',
    filterOperatorIs: 'dir', // Not suitable for Turkish language
    filterOperatorNot: 'değildir',
    filterOperatorAfter: 'sonrasında',
    filterOperatorOnOrAfter: 'aynı veya sonra',
    filterOperatorBefore: 'önce',
    filterOperatorOnOrBefore: 'aynı veya önce',
    filterOperatorIsEmpty: 'boş',
    filterOperatorIsNotEmpty: 'boş değil',
    filterOperatorIsAnyOf: 'nın bir elemanı',
    
    // Filter values text
    filterValueAny: 'herhangi',
    filterValueTrue: 'doğru',
    filterValueFalse: 'yanlış',
    
    // Column menu text
    columnMenuLabel: 'Menü',
    columnMenuShowColumns: 'Sütunları Göster',
    columnMenuFilter: 'Filtrele',
    columnMenuHideColumn: 'Gizle',
    columnMenuUnsort: 'Derlemeyi Kaldır',
    columnMenuSortAsc: 'Artan ile Derle',
    columnMenuSortDesc: 'Azalan ile Derle',
    
    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} aktif filtreler` : `${count} aktif filtre`,
    columnHeaderFiltersLabel: 'Filtreleri Göster',
    columnHeaderSortIconLabel: 'Derle',
    
    // Rows selected footer text
    footerRowSelected: (count) =>
      count !== 1
        ? `${count.toLocaleString()} seçili satırlar`
        : `${count.toLocaleString()} satırlar seçildi`,
    
    // Total row amount footer text
    footerTotalRows: 'Toplam Satırlar:',
    
    // Total visible row amount footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${totalCount.toLocaleString()} da ${visibleCount.toLocaleString()}`,
    MuiTablePagination: {
        labelDisplayedRows: ({ from, to, count }) =>
        `${count} içinde ${from} - ${to}`,
        labelRowsPerPage:"1 sayfadaki satır sayısı :",
        
    },
    
    // Checkbox selection text
    checkboxSelectionHeaderName: 'Onay Kutusu Seçimi',
    checkboxSelectionSelectAllRows: 'Bütün Satırları Seç',
    checkboxSelectionUnselectAllRows: 'Satır Seçimini Kaldır',
    checkboxSelectionSelectRow: 'Satır Seç',
    checkboxSelectionUnselectRow: 'Satır Seçimini Kaldır',
    
    // Boolean cell text
    booleanCellTrueLabel: 'evet',
    booleanCellFalseLabel: 'hayır',
    
    // Actions cell more text
    actionsCellMore: 'daha',
    
    // Column pinning text
    pinToLeft: 'Sola sabitle',
    pinToRight: 'Sağa sabitle',
    unpin: 'Sabitlemeyi Kaldır',
    
    // Tree Data
    treeDataGroupingHeaderName: 'grupla',
    treeDataExpand: 'altındakileri gör',
    treeDataCollapse: 'altındakileri gizle',
    
    // Grouping columns
    groupingColumnHeaderName: 'Grupla',
    groupColumn: (name) => `${name} ile grupla`,
    unGroupColumn: (name) => `${name} ile gruplamayı kaldır`,
    
    // Master/detail
    detailPanelToggle: 'Ayrıntı Panelini Sabitle',
    expandDetailPanel: 'Genişlet',
    collapseDetailPanel: 'Daralt',
    
    // Used core components translation keys
    MuiTablePagination: {},
    
    // Row reordering text
    rowReorderingHeaderName: 'Satır Derlemesi',
    
    // Aggregation
    aggregationMenuItemHeader: 'Kümeleme',
    aggregationFunctionLabelSum: 'toplam',
    aggregationFunctionLabelAvg: 'ortalama',
    aggregationFunctionLabelMin: 'en alçak',
    aggregationFunctionLabelMax: 'en yüksek',
    aggregationFunctionLabelSize: 'boyut',
    };